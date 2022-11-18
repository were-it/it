defmodule ItWeb.Resolvers.Users do
  require Logger
  alias It.Users
  # alias ItWeb.Schema.ChangesetError

  def get_me(_, _, %{context: %{current_user: user}}) do
    {:ok, user}
  end

  def get_me(_, _, _) do
    {:ok, nil}
  end

  def get_user_by_username(_, %{username: username}, _) do
    case Users.get_user_by_username(username) do
      {:error, error} ->
        {:error, error}

      user ->
        {:ok, user}
    end
  end
end
