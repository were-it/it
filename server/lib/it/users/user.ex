defmodule It.Users.User do
  use Ecto.Schema

  use Pow.Ecto.Schema,
    password_hash_methods: {&Argon2.hash_pwd_salt/1, &Argon2.verify_pass/2}

  import Ecto.Changeset

  schema "users" do
    field(:username, :string)

    pow_user_fields()

    timestamps()
  end

  def data() do
    Dataloader.Ecto.new(It.Repo, query: &query/2)
  end

  def query(queryable, _params) do
    queryable
  end

  def changeset(user_or_changeset, attrs) do
    user_or_changeset
    |> pow_changeset(attrs)
    |> cast(attrs, [:username])
    |> validate_required([:username])
    |> validate_username()
  end

  def username_changeset(user, attrs) do
    user
    |> cast(attrs, [:username])
    |> validate_required([:username])
    |> validate_username()
    |> unique_constraint(:username)
  end

  defp validate_username(%{changes: %{username: username}} = changeset) do
    custom_blacklist = [
      "app",
      "apps",
      "course",
      "courses",
      "creator",
      "creators",
      "it",
      "maker",
      "makers",
      "shortcut",
      "shortcuts",
      "teacher",
      "teachers",
      "tool",
      "tools",
      "u",
      "wereit"
    ]

    if TheBigUsernameBlacklist.valid?(username, custom_blacklist) do
      # 25 character limit because the username generator can generate up to 25 char names
      changeset |> validate_format(:username, ~r/^[a-z0-9_]{3,25}$/)
    else
      add_error(changeset, :username, "Invalid username.")
    end
  end

  defp validate_username(changeset), do: changeset
end
