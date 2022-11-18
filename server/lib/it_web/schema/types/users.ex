defmodule ItWeb.Schema.Types.Users do
  use Absinthe.Schema.Notation

  alias ItWeb.Resolvers

  @desc "User"
  object :user do
    field(:id, non_null(:id))
    @desc "The user's email address."
    field(:email, non_null(:string))
    @desc "The user's username."
    field(:username, non_null(:string))
  end
end
