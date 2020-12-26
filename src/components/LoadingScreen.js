export const LoadingScreen = ({ preloaded }) => (
  <div className="preload">
    <div className={!preloaded ? 'preload__inner' : 'preload__inner loaded'}>
      <img src="/images/logo.png" alt="Načítám" />
    </div>
  </div>
);
