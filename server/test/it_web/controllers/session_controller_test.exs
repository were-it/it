defmodule ItWeb.SessionControllerTest do
  use ItWeb.ConnCase

  alias It.{Repo, Users.User}

  @password "secret1234"

  setup do
    user =
      %User{}
      |> User.changeset(%{
        email: "josh@wereit.app",
        password: @password,
        password_confirmation: @password,
        username: "joshsmith"
      })
      |> Repo.insert!()

    {:ok, user: user}
  end

  describe "create/2" do
    @valid_params %{"user" => %{"email" => "josh@wereit.app", "password" => @password}}
    @invalid_params %{"user" => %{"email" => "josh@wereit.app", "password" => "invalid"}}

    test "with valid params", %{conn: conn} do
      conn = post(conn, Routes.session_path(conn, :create, @valid_params))

      assert json = json_response(conn, 200)
      assert json["data"]["access_token"]
      assert json["data"]["renewal_token"]
    end

    test "with invalid params", %{conn: conn} do
      conn = post(conn, Routes.session_path(conn, :create, @invalid_params))

      assert json = json_response(conn, 401)
      assert json["error"]["message"] == "Invalid email or password"
      assert json["error"]["status"] == 401
    end
  end

  describe "renew/2" do
    setup %{conn: conn} do
      authed_conn = post(conn, Routes.session_path(conn, :create, @valid_params))

      {:ok, renewal_token: authed_conn.private[:api_renewal_token]}
    end

    test "with valid authorization header", %{conn: conn, renewal_token: token} do
      conn =
        conn
        |> Plug.Conn.put_req_header("authorization", "Bearer " <> token)
        |> post(Routes.session_path(conn, :renew))

      assert json = json_response(conn, 200)
      assert json["data"]["access_token"]
      assert json["data"]["renewal_token"]
    end

    test "with invalid authorization header", %{conn: conn} do
      conn =
        conn
        |> Plug.Conn.put_req_header("authorization", "invalid")
        |> post(Routes.session_path(conn, :renew))

      assert json = json_response(conn, 401)
      assert json["error"]["message"] == "Invalid token"
      assert json["error"]["status"] == 401
    end
  end

  describe "delete/2" do
    setup %{conn: conn} do
      authed_conn = post(conn, Routes.session_path(conn, :create, @valid_params))

      {:ok, access_token: authed_conn.private[:api_access_token]}
    end

    test "invalidates", %{conn: conn, access_token: token} do
      conn =
        conn
        |> Plug.Conn.put_req_header("authorization", token)
        |> delete(Routes.session_path(conn, :delete))

      assert json = json_response(conn, 200)
      assert json["data"] == %{}
    end
  end
end
