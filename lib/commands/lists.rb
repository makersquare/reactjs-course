module AwsumLink
  module Lists
    def self.get_lists
      lists = AwsumLink.db.get_all_lists
      lists.each do |list|
        list["links"] = AwsumLink.db.get_links_from_list(list["id"])
      end
      return lists
    end

    def self.get_lists_from_user user_id
      lists_array = []
      lists = AwsumLink.db.get_lists_from_user user_id
      lists.each do |list|
        list["links"] = AwsumLink.db.get_links_from_list(list["id"])
        lists_array.push list
      end
      return lists_array
    end

    def self.get_list id
      list_hash  = AwsumLink.db.get_list id
      links_hash = AwsumLink.db.get_links_from_list id
      list_hash["links"] = links_hash
      return list_hash
    end

    def self.create_list user_id, name
      AwsumLink.db.create_list user_id, name
    end

    def self.delete_list id
      AwsumLink.db.delete_list id
    end

    def self.update_list id, params
      AwsumLink.db.update_list id, params
    end
  end
end
