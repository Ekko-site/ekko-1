import React from 'react'
import { Text, Button } from 'rebass'

const ApiError = () => {
    return (
        <div className="flex justify-center items-center" style={{
                height: '80vh'
            }}>
            <div className="center flex flex-column" style={{
                    minHeight: '40vh'
                }}>
                <Text mb={2}>
                    Sorry, we're having some issues right now.
                </Text>
                <div className="inline-table">
                    <Button href="#" onClick={() => window.location.reload(true)}>Refresh</Button>
                </div>
                <Text mt={2}>
                    We're actively working on fixing them, so please bear with us!
                </Text>
            </div>
        </div>
    )
}

export default ApiError
