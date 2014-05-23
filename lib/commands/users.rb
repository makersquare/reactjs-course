module AwsumLink
  module Users
    def self.get_user id
      AwsumLink.db.get_user id
      user_hash  = AwsumLink.db.get_user id
      lists_hash = AwsumLink::Lists.get_lists_from_user id
      user_hash["lists"] = lists_hash
      return user_hash
    end

    def self.get_users
      AwsumLink.db.get_all_users
    end

    def self.delete_user id
      return AwsumLink.db.delete_user id
    end

    def self.create_user username, password
      return AwsumLink.db.create_user username, password
    end
  end
end
