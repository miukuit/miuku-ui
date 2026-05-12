import { expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { MSmartTable } from '../src'

it('button', () => {
  const page = render(MSmartTable, {
    props: {
      type: 'primary',
    },
  })
  expect(page.container.textContent).toMatchInlineSnapshot(
    `" my button type: primary count: 0"`,
  )
  expect(page.container.innerHTML).toMatchInlineSnapshot(
    `"<k-smart-table></k-smart-table>"`,
  )
})
