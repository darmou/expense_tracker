class Expense < ApplicationRecord
  belongs_to :user
  mount_base64_uploader :expense_receipt, ImageUploader

  def receipt_url
    return (self.expense_receipt) ? expense_receipt.url : ""
  end

end
