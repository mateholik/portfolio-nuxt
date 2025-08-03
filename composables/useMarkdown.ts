import markdownIt from 'markdown-it';

export const useMarkdown = () => {
  const md = markdownIt({ html: true });

  // Configure markdown to open links in new windows
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const defaultLinkRenderer =
    (md as any).renderer.rules.link_open ||
    function (tokens: any, idx: any, options: any, env: any, self: any) {
      return self.renderToken(tokens, idx, options);
    };

  (md as any).renderer.rules.link_open = function (
    tokens: any,
    idx: any,
    options: any,
    env: any,
    self: any
  ) {
    const token = tokens[idx];
    token.attrSet('target', '_blank');
    token.attrSet('rel', 'noopener noreferrer');
    return defaultLinkRenderer(tokens, idx, options, env, self);
  };
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return {
    render: (content: string) => md.render(content),
  };
};
