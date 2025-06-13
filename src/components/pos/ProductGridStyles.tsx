
export const ProductGridStyles = () => (
  <style>
    {`
      @keyframes vibrate3d {
        0% { transform: translateX(0px) translateY(0px) rotateZ(0deg); }
        5% { transform: translateX(-1px) translateY(1px) rotateZ(-0.5deg); }
        15% { transform: translateX(2px) translateY(-1px) rotateZ(1deg); }
        25% { transform: translateX(-2px) translateY(0px) rotateZ(-1deg); }
        35% { transform: translateX(1px) translateY(-2px) rotateZ(0.5deg); }
        45% { transform: translateX(-1px) translateY(1px) rotateZ(-0.5deg); }
        55% { transform: translateX(2px) translateY(1px) rotateZ(1deg); }
        65% { transform: translateX(-1px) translateY(-1px) rotateZ(-0.8deg); }
        75% { transform: translateX(1px) translateY(2px) rotateZ(0.8deg); }
        85% { transform: translateX(-2px) translateY(-1px) rotateZ(-1deg); }
        95% { transform: translateX(1px) translateY(0px) rotateZ(0.5deg); }
        100% { transform: translateX(0px) translateY(0px) rotateZ(0deg); }
      }
      .vibrate3d {
        animation: vibrate3d 1.2s ease-in-out infinite;
      }
      
      @keyframes smoothSlideIn {
        from {
          opacity: 0;
          transform: scale(0.95) translateY(-10px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
      
      .smooth-enter {
        animation: smoothSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
    `}
  </style>
);
