require_relative 'db/database.rb'
require_relative 'commands/users.rb'
require_relative 'commands/lists.rb'
require_relative 'commands/links.rb'

module AwsumLink
  # Init DB connection
  @database = AwsumLink.db
end
