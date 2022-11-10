defmodule It.Repo do
  use Ecto.Repo,
    otp_app: :it,
    adapter: Ecto.Adapters.Postgres
end
