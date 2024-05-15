import { useState, useEffect, useCallback } from "react";

const useTest = () => {

    useEffect(() => {
        const unsubscribe = 
    
        return () => {
          unsubscribe();
        };
      }, []);
}