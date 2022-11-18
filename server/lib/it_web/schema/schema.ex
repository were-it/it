defmodule It.Schema.Schema do
  use Absinthe.Schema

  alias It.Users.{User}

  import_types(ItWeb.Schema.Queries.Users)
  # import_types(ItWeb.Schema.Mutations.Users)
  import_types(ItWeb.Schema.Types.Users)

  def context(ctx) do
    loader =
      Dataloader.new()
      |> Dataloader.add_source(User, User.data())

    Map.put(ctx, :loader, loader)
  end

  def plugins do
    [Absinthe.Middleware.Dataloader] ++ Absinthe.Plugin.defaults()
  end

  query do
    import_fields(:users_queries)
  end

  # mutation do
  #   import_fields(:users_mutations)
  # end
end
