'use client';
import React, { useState, useRef, useEffect } from "react";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  AnimatePresence 
} from "framer-motion";
import { Menu, X, GripHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const Dock = React.forwardRef(
  ({
    className,
    children,
    magnification = DEFAULT_MAGNIFICATION,
    distance = DEFAULT_DISTANCE,
    ...props
  }, ref) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            mousex: mouseX,
            magnification,
            distance,
          });
        }
        return child;
      });
    };

    const childrenArray = React.Children.toArray(children);
    // Show first 4 on mobile bar, rest in menu
    const mobileVisible = childrenArray.slice(0, 4);
    const mobileHidden = childrenArray.slice(4);

    return (
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[9999] w-auto flex justify-center">
        
        {/* DESKTOP DOCK */}
        <motion.div
          ref={ref}
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className={cn(
            "hidden md:flex h-16 items-end gap-4 rounded-2xl bg-neutral-900/40 border border-white/10 px-4 pb-3 backdrop-blur-md shadow-2xl ring-1 ring-white/5",
            className
          )}
          {...props}
        >
          {renderChildren()}
        </motion.div>

        {/* MOBILE DOCK (Floating Island) */}
        <div className="md:hidden w-[90vw] max-w-sm">
            <motion.div 
                layout
                className={cn(
                    "bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500 ease-out",
                    isMobileMenuOpen ? "p-6" : "p-3"
                )}
            >
                {/* Visible Row */}
                <div className="flex justify-between items-center px-2">
                    <div className="flex gap-5">
                        {mobileVisible.map((child, i) => {
                            // Only clone React components (not native DOM elements) with mobile prop
                            if (React.isValidElement(child) && typeof child.type === 'function') {
                                return (
                                    <div key={i} className="text-white transform scale-90">
                                        {React.cloneElement(child, { mobile: true })}
                                    </div>
                                );
                            }
                            // Render other children as-is (like separator divs)
                            return <React.Fragment key={i}>{child}</React.Fragment>;
                        })}
                    </div>
                    
                    <div className="h-8 w-[1px] bg-white/10 mx-2"></div>

                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 text-white active:scale-90 transition-transform"
                    >
                        {isMobileMenuOpen ? <X size={18} /> : <GripHorizontal size={20} />}
                    </button>
                </div>

                {/* Hidden Grid (Expands Up) */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className="grid grid-cols-4 gap-4 border-t border-white/10 pt-4"
                        >
                            {mobileHidden.map((child, i) => {
                                // Only clone React components (not native DOM elements) with mobile prop
                                if (React.isValidElement(child) && typeof child.type === 'function') {
                                    return (
                                        <motion.div 
                                            key={i} 
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex justify-center text-white"
                                        >
                                            {React.cloneElement(child, { mobile: true })}
                                        </motion.div>
                                    );
                                }
                                // Skip non-component children in hidden grid
                                return null;
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
      </div>
    );
  }
);
Dock.displayName = "Dock";

const DockIcon = ({
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mousex,
  className,
  children,
  tooltip,
  mobile = false,
  ...props
}) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const distanceCalc = useTransform(mousex || useMotionValue(Infinity), (val) => {
    if (!ref.current) return 0;
    const bounds = ref.current.getBoundingClientRect();
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distanceCalc, [-distance, 0, distance], [40, magnification, 40]);
  
  // Refined Physics: Stronger mass for weightier feel
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });
  
  // Lift Logic: Moves icon UP when scaled
  const ySync = useTransform(distanceCalc, [-distance, 0, distance], [0, -12, 0]);
  const y = useSpring(ySync, { mass: 0.1, stiffness: 150, damping: 12 });

  if (mobile) {
      return (
        <div className={cn("flex items-center justify-center h-10 w-10 bg-neutral-800/50 rounded-full border border-white/5", className)}>
            {children}
        </div>
      )
  }

  return (
    <div className="relative group">
        {/* Tooltip */}
        <AnimatePresence>
            {isHovered && tooltip && (
                <motion.div
                    initial={{ opacity: 0, y: 10, x: "-50%", scale: 0.9 }}
                    animate={{ opacity: 1, y: -15, x: "-50%", scale: 1 }}
                    exit={{ opacity: 0, y: 2, x: "-50%", scale: 0.9 }}
                    className="absolute -top-10 left-1/2 px-3 py-1 bg-neutral-900/90 border border-white/20 text-white text-[10px] font-medium rounded-lg whitespace-nowrap z-[100] shadow-xl backdrop-blur-sm pointer-events-none"
                >
                    {tooltip}
                </motion.div>
            )}
        </AnimatePresence>

        <motion.div
            ref={ref}
            style={{ width, y }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                "flex aspect-square cursor-pointer items-center justify-center rounded-full bg-neutral-900/50 border border-white/10 shadow-lg hover:bg-neutral-800 transition-colors",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
        
        {/* Reflection/Shine effect */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};
DockIcon.displayName = "DockIcon";

export { Dock, DockIcon };