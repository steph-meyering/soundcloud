json.extract! comment, :id, :user_id, :song_id, :body, :song_time, :updated_at
json.commenter comment.user.username