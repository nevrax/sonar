import React from 'react'
import { NavLink } from 'react-router-dom'

import config from '../lib/config'

const island = config.get('island')

export default function Sidebar (props) {
  return (
    <div className='sonar-sidebar'>
      <h2>Sonar</h2>
      <ul>
        <li><NavLink exact to='/'>Start</NavLink></li>
        <li><NavLink to='/config'>Config</NavLink></li>
        <li><NavLink to='/islands'>Islands</NavLink></li>
        {island && (
          <>
            <li className='sonar-sidebar--seperator'><h2>{island.substring(0, 6)}</h2></li>
            <li><NavLink to='/search'>Search</NavLink></li>
            <li><NavLink to='/filebrowser'>Filebrowser</NavLink></li>
            <li><NavLink to='/tables'>Tables</NavLink></li>
          </>
        )}
      </ul>
    </div>
  )
}
