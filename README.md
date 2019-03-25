# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index, unique: true|
|mail|string|null: false, unique: true|
|password|integer|null: false|

### Association
- has_many :messages
- has_many :groups, through: :members

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :messages
- has_many :users, through: :members

## text_messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## photo_messagesテーブル

|Column|Type|Options|
|------|----|-------|
|image|string|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false,foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user