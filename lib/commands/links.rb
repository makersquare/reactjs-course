module AwsumLink
  module Links
    def self.get_link id
      AwsumLink.db.get_link id
    end

    def self.get_links
      AwsumLink.db.get_links
    end

    def self.create_link list_id, url, name, description
      AwsumLink.db.create_link list_id, url, name, description
    end

    def self.delete_link id
      AwsumLink.db.delete_link id
    end

    def self.update_link id, params
      AwsumLink.db.update_link id, params
    end
  end
end
