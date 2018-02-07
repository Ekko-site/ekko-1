import React from 'react'

import Loading from '@/components/loading'
import UpgradeErrors from '@/components/settings/upgrade-errors'

class Account extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showChangePassword: false,
            showCancelConfirm: false
        }
    }
    handleSettingsSave = () => {
        const { handleSettingsSave, onError } = this.props
        if(!this.current_password.value || !this.new_password.value || !this.new_password_match.value){
            return onError('Please fill out all password fields')
        }
        if(this.new_password.value !== this.new_password_match.value){
            return onError('Passwords must match')
        }
        if(this.new_password.value == this.current_password.value){
            return onError('🤔 your new password will match your old one. Taking no action.')
        }
        return handleSettingsSave(this.current_password.value, this.new_password.value)
    }
    handleCancel = () => {
        this.props.handleCancel()
    }
    showCancelConfirm() {
        this.setState({
            showCancelConfirm: true
        })
    }
    hideCancelConfirm = () => {
        this.setState({
            showCancelConfirm: false
        })
    }
    render() {
        let { updated_password, updating_password, user = {}, passwordErrors = {} } = this.props
        user = user || {}
        return (
            <div className="block mb--palm">
                <h3 className="half-mb">Your account</h3>
                <form className="form account-form big-mb" onSubmit={event => {
                    event.preventDefault()
                    this.handleSettingsSave()
                }}>
                    <label for="email-input" className="mini">Your email</label>
                    <input type="email" disabled value={user.email} id="email-input" className="full-width i-w-m" />
                    <p className="tiny">To change your email address, please send your <a href="mailto:hello@ekko.site?subject=change email" data-tooltip="Open mail client">request via email.</a></p>
                    {(!this.state.showChangePassword) && (
                        <p className="half-mb">Change your <span className="text-button" onClick={() => this.setState({
                            showChangePassword: true
                        })}>password?</span></p>
                    )}
                    {(updated_password) && (
                        <p>Password changed successfully!</p>
                    )}
                    {(this.state.showChangePassword && !updated_password) && (
                        <div>
                            <label for="current-password" className="mini">Your current password</label>
                            <input type="password" ref={c => (this.current_password = c)} id="current-password" className="full-width i-w-m" />
                            <label for="new-password" className="mini">Choose a new password</label>
                            <input type="password" ref={c => (this.new_password = c)} id="new-password" className="full-width i-w-m" />
                            <label for="new-password-repeat" className="mini">Repeat the password</label>
                            <input type="password" ref={c => (this.new_password_match = c)} id="new-password-repeat" className="full-width half-mb" />
                            {!!(Object.keys(passwordErrors).length) && (
                                <UpgradeErrors error={passwordErrors} />
                            )}
                            {(updating_password) && (
                                <Loading />
                            )}
                            {(!updating_password) && (
                                <button className="butt butt--yellow half-mt">Update settings</button>
                            )}
                        </div>
                    )}
                </form>
                <div>
                    <a href="#" className="butt butt--red big-mb" onClick={event => {
                        event.preventDefault()
                        this.showCancelConfirm()
                    }}>Cancel account</a>
                    {
                        this.state.showCancelConfirm && (
                            <div>
                                <p>Are you positively sure?</p>
                                <div className="butt" style={{
                                    marginRight: '0.65em'
                                }} onClick={this.handleCancel}>Yes</div>
                                <div className="butt butt--outline" onClick={this.hideCancelConfirm}>No</div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Account
