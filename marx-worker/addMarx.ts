export default function addMarx <Input, Output> (
  onInput: (props: {
    input: Input
    post: (output: Output) => void
  }) => void
): void {
  addEventListener('message', (event: MessageEvent<Input>) => {
    function post (output: Output): void {
      postMessage(output)
    }
    onInput({ input: event.data, post })
  })
}
