import { motion } from 'framer-motion';
import React, { ComponentType } from 'react';

const Transition = (OgComponent: ComponentType) => {
    return () => (
        <>
            <OgComponent />
            <motion.div
                data-testid='slide-in'
                className='slide-in'
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
                data-testid='slide-out'
                className='slide-out'
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
        </>
    );
};

export default Transition;
