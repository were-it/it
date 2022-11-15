defmodule ItWeb.Schema.Queries.Users do
  use Absinthe.Schema.Notation

  alias ItWeb.Resolvers

  object :users_queries do
    @desc "Get the currently signed-in user"
    field :get_me, :user do
      resolve(&Resolvers.Users.get_me/3)
    end

    @desc "Get a user"
    field :get_user, :user do
      arg(:username, non_null(:string))
      resolve(&Resolvers.Users.get_user_by_username/3)
    end
  end
end
