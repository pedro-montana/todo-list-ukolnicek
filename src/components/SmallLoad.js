export const SmallLoad = ({ preloaded }) => (
  <div className="small-load">
    <div className={!preloaded ? 'small-load__inner' : 'small-load__inner loaded'}>
      <img src="/images/logo.png" alt="Načítám" />
    </div>
  </div>
);
