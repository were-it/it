defmodule ItWeb.Router do
  use ItWeb, :router
  use Pow.Phoenix.Router

  pipeline :api do
    plug(:accepts, ["json"])
    plug(ItWeb.APIAuthPlug, otp_app: :it)
  end

  pipeline :api_protected do
    plug(Pow.Plug.RequireAuthenticated, error_handler: ItWeb.APIAuthErrorHandler)
  end

  scope "/api", ItWeb do
    pipe_through(:api)

    resources("/registration", RegistrationController, singleton: true, only: [:create])
    resources("/session", SessionController, singleton: true, only: [:create, :delete])
    post("/session/renew", SessionController, :renew)
  end

  scope "/api", ItWeb do
    pipe_through([:api, :api_protected])

    # Your protected API endpoints here
  end
end
