import { useTheme } from '../theme/useTheme'

type Token =
  | { type: 'keyword' | 'string' | 'function' | 'comment' | 'variable' | 'number' | 'type' | 'punct' | 'plain'; text: string }
  | { type: 'newline' }

const lines: Token[][] = [
  [{ type: 'keyword', text: 'import' }, { type: 'plain', text: ' { useState } ' }, { type: 'keyword', text: 'from' }, { type: 'string', text: " 'react'" }],
  [],
  [{ type: 'keyword', text: 'type' }, { type: 'plain', text: ' ' }, { type: 'type', text: 'User' }, { type: 'plain', text: ' = {' }],
  [{ type: 'plain', text: '  id: ' }, { type: 'type', text: 'number' }],
  [{ type: 'plain', text: '  name: ' }, { type: 'type', text: 'string' }],
  [{ type: 'plain', text: '}' }],
  [],
  [{ type: 'comment', text: '// returns a greeting message' }],
  [{ type: 'keyword', text: 'function' }, { type: 'plain', text: ' ' }, { type: 'function', text: 'greet' }, { type: 'plain', text: '(user: ' }, { type: 'type', text: 'User' }, { type: 'plain', text: ') {' }],
  [{ type: 'keyword', text: '  return' }, { type: 'plain', text: ' ' }, { type: 'string', text: '`Hello ${user.name}`' }],
  [{ type: 'plain', text: '}' }],
  [],
  [{ type: 'keyword', text: 'const' }, { type: 'plain', text: ' ' }, { type: 'variable', text: 'user' }, { type: 'plain', text: ': ' }, { type: 'type', text: 'User' }, { type: 'plain', text: ' = {' }],
  [{ type: 'plain', text: '  id: ' }, { type: 'number', text: '1' }, { type: 'plain', text: ',' }],
  [{ type: 'plain', text: '  name: ' }, { type: 'string', text: "'Alex'" }],
  [{ type: 'plain', text: '}' }],
  [],
  [{ type: 'variable', text: 'console' }, { type: 'plain', text: '.' }, { type: 'function', text: 'log' }, { type: 'plain', text: '(' }, { type: 'function', text: 'greet' }, { type: 'plain', text: '(' }, { type: 'variable', text: 'user' }, { type: 'plain', text: '))' }],
]

export default function CodeMock() {
  const { theme } = useTheme()

  const colorMap: Record<string, string> = {
    keyword: theme.editor.keyword,
    string: theme.editor.string,
    function: theme.editor.function,
    comment: theme.editor.comment,
    variable: theme.editor.variable,
    number: theme.editor.number,
    type: theme.editor.type,
  }

  return (
    <pre
      className="p-5 text-[13px] leading-6 font-mono h-full overflow-auto m-0"
      style={{ background: theme.editor.bg, color: theme.editor.text }}
    >
      {lines.map((line, li) => (
        <div
          key={li}
          className="flex"
          style={li === 8 ? { background: theme.editor.lineHighlight, borderRadius: '2px' } : {}}
        >
          <span
            className="select-none w-8 shrink-0 text-right pr-4 text-[11px] mt-[2px]"
            style={{ color: `${theme.editor.text}40` }}
          >
            {li + 1}
          </span>
          <span>
            {line.map((token, ti) => (
              <span key={ti} style={{ color: colorMap[token.type] }}>
                {'text' in token ? token.text : ''}
              </span>
            ))}
          </span>
        </div>
      ))}
    </pre>
  )
}
