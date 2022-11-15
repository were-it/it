defmodule ItWeb.Router do
  use ItWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])
    plug(ItWeb.APIAuthPlug, otp_app: :it)
  end

  # pipeline :api_protected do
  #   plug(Pow.Plug.RequireAuthenticated, error_handler: ItWeb.APIAuthErrorHandler)
  # end

  scope "/" do
    pipe_through(:api)

    resources("/registration", ItWeb.RegistrationController, singleton: true, only: [:create])
    resources("/session", ItWeb.SessionController, singleton: true, only: [:create, :delete])
    post("/session/renew", ItWeb.SessionController, :renew)
  end

  scope "/" do
    pipe_through(:api)
    # pipe_through([:api, :api_protected])

    forward("/api", Absinthe.Plug, schema: It.Schema.Schema)

    if Mix.env() == :dev do
      forward("/graphiql", Absinthe.Plug.GraphiQL,
        schema: It.Schema.Schema,
        interface: :playground
      )
    end
  end
end
