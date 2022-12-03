import React from 'react'
import Button from '../comonents/Button/Button'

export default function WalletNotConnected({onClick}) {
  return (
    <div className="flex h-screen text-center">
    <div className="m-auto">
      <p className="text-7xl font-bold text-gray-800 tracking-wider">
        Smart Stamp
      </p>
      <p className="text-sm text-gray-500 w-1/2 mx-auto mt-5">
        Welcome to Smart stamp service home screen. Are you worried about
        lost of your contracts or stamps? Let us bring you blockchain NFT
        based stamps where you just have to connect your metamask with  Mumbai Testnet network and
        write your stamps details. That's it.
      </p>
      <Button title="Connect Metamask" onClick={onClick} />
    </div>
  </div>
  )
}
