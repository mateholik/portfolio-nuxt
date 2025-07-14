declare module 'markdown-it' {
  interface MarkdownIt {
    render(markdown: string): string;
    parse(src: string, env?: unknown): unknown;
  }

  interface MarkdownItConstructor {
    new (presetName?: string, options?: unknown): MarkdownIt;
    (): MarkdownIt;
  }

  const markdownit: MarkdownItConstructor;
  export = markdownit;
}

declare module 'vue-number-animation' {
  import type { DefineComponent } from 'vue';

  interface NumberAnimationProps {
    from?: number;
    to?: number;
    duration?: number;
    autoplay?: boolean;
    easing?: string;
    format?: (value: number) => string;
  }

  const NumberAnimation: DefineComponent<NumberAnimationProps>;
  export default NumberAnimation;
}
