class Expense < ApplicationRecord
  belongs_to :user
  mount_base64_uploader :expense_receipt, ImageUploader
end
