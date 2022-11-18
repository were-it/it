defmodule It.Users do
  @moduledoc """
  The Users context.
  """

  require Logger
  import Ecto.Query, warn: false
  alias It.Repo

  alias It.Users.User

  def get_user_by_username(username) do
    User |> Repo.get_by(username: username)
  end

  def update_user_username(%User{} = user, attrs) do
    user
    |> User.username_changeset(attrs)
    |> Repo.update()
  end
end
