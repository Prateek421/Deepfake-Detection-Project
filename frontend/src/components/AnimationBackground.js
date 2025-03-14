import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './AnimationBackground.css';

const AnimationBackground = () => {
    useEffect(() => {
        const elements = document.querySelectorAll('.element');
        gsap.to(elements, {
            x: (i) => i * 100,
            y: (i) => i * 50,
            rotation: 360,
            duration: 5,
            repeat: -1,
            yoyo: true,
            stagger: {
                amount: 2,
                from: 'center',
            },
        });
    }, []);

    return <div className="animated-background"></div>;
};

export default AnimationBackground;