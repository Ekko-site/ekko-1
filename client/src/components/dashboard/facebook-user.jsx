import React from 'react'
import { Text } from 'rebass'

import Icon from '@/components/icon'

const FacebookUser = ({ facebookUserId }) => {
    return <Text mb={1}><Icon name="facebook-official" /> Connected</Text>
}

export default FacebookUser
