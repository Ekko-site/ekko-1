import React from 'react'

const Icon = ({
    name,
    loading = false,
    className = ''
}) => <i className={`fa fa-${name} ${loading && 'fa-spin'} mr1 ${className}`} />

export default Icon
