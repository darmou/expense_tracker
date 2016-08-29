# Be sure to restart your server when you modify this file.

#Rails.application.config.session_store :cookie_store, key: "_expense_tracker_session"
Rails.application.config.session_store :cookie_store, {
    :key =>           '_expense_tracker_session',
    :path =>          '/',
    :domain =>        nil,
    :expire_after =>  nil,
    :secure =>        false,
    :httponly =>      false,
    :cookie_only =>   true
}
#Rails.application.config.session_store :active_record_store, :key => "_expense_tracker_session"
#Rails.application.config.session_store :cache_store
