import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';

const RegistrationForm = ({ user, onSave, onChange, saving }) => {
  return (
    <form>
      <h1>Create account</h1>
      <TextInput
        name="email"
        label="Email"
        onChange={onChange}
        value={user.email}
      />

      <TextInput
        name="password"
        label="Password"
        onChange={onChange}
        value={user.password}
      />

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Signing up...' : 'Sign Up'}
        className="btn btn-primary"
        onClick={onSave}
      />
    </form>
  );
};

RegistrationForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default RegistrationForm;
