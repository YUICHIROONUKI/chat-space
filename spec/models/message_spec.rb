require 'rails_helper'

describe 'Message' do
	describe '#create' do
		it "is valid with only content" do
			message = build(:message, image: nil)
			expect(message).to be_valid
		end

		it "is valid with only image" do
			message = build(:message, content: nil)
			expect(message).to be_valid
		end

		it "is valid with image,content" do
			message = build(:message)
			expect(message).to be_valid
		end

		it "is invalid without image,content" do
			message = build(:message, content: nil, image: nil)
			message.valid?
			expect(message.errors[:content]).to include("を入力してください")
		end

		it "is invalid without gourp_id" do
			message = build(:message, group: nil)
			message.valid?
			expect(message.errors[:group]).to include("を入力してください")
		end

		it "is invalid without user_id" do
			message = build(:message, user: nil)
			message.valid?
			expect(message.errors[:user]).to include("を入力してください")
		end
	end
end