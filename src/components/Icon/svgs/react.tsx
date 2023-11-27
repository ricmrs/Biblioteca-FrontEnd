const reactIcon = () => (
  <>
    <image
      xlinkHref="data:image/png;base64,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&#10;"
    />
  </>
);

export default reactIcon;