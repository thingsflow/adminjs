/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import { Location } from 'history'
import { DifferentActionParams, useActionResponseHandler } from '../../hooks'
import { actionHasComponent } from './action-has-component'
import { actionHref } from './action-href'
import { ActionJSON } from './action-json.interface'
import { buildActionCallApiTrigger } from './build-action-api-call-trigger'

export type BuildActionClickOptions = {
  action: ActionJSON;
  params: DifferentActionParams;
  actionResponseHandler: ReturnType<typeof useActionResponseHandler>;
  push: (path: string, state?: any) => void;
  location?: Location;
}

export type BuildActionClickReturn = (event: any) => any

export const buildActionClickHandler = (
  options: BuildActionClickOptions,
): BuildActionClickReturn => {
  const { action, params, actionResponseHandler, push } = options

  const handleActionClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault()
    event.stopPropagation()

    const href = actionHref(action, params)

    const callApi = buildActionCallApiTrigger({
      params, action, actionResponseHandler,
    })

    if (action.guard && !confirm(action.guard)) {
      return
    }
    if (actionHasComponent(action)) {
      callApi()
    } else if (href) {
      const url = new URL(`relative:${href}`)
      const hrefParams = new URLSearchParams(url.search)
      const currentParams = new URLSearchParams(action.showInDrawer ? location?.search ?? '' : '')
      Object.entries(Object.fromEntries(currentParams.entries())).forEach(([key, value]) => {
        hrefParams.append(key, value)
      })

      push(`${url.pathname}${hrefParams.toString()}`, { previousPage: window.location.href })
    }
  }

  return handleActionClick
}
