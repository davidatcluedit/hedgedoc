/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { doLogout } from '../../../api/auth'
import { clearUser } from '../../../redux/user/methods'
import { cypressId } from '../../../utils/cypress-attribute'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { useUiNotifications } from '../../notifications/ui-notification-boundary'
import React, { useCallback } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'

/**
 * Renders a sign-out button as a dropdown item for the user-dropdown.
 */
export const SignOutDropdownButton: React.FC = () => {
  useTranslation()
  const { showErrorNotification } = useUiNotifications()

  const onSignOut = useCallback(() => {
    clearUser()
    doLogout().catch(showErrorNotification('login.logoutFailed'))
  }, [showErrorNotification])

  return (
    <Dropdown.Item dir='auto' onClick={onSignOut} {...cypressId('user-dropdown-sign-out-button')}>
      <ForkAwesomeIcon icon='sign-out' fixedWidth={true} className='mx-2' />
      <Trans i18nKey='login.signOut' />
    </Dropdown.Item>
  )
}
