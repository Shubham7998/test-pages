// src/app/services/local-storage.service.ts
import { Injectable } from '@angular/core';


  
  export function setItem(key: string, value: any): void {
    const jsonData = JSON.stringify(value);
    localStorage.setItem(key, jsonData);
  }

 export function  getItem(key: string): any {
    const jsonData = localStorage.getItem(key);
    return jsonData ? JSON.parse(jsonData) : null;
  }

  export function removeItem(key: string): void {
    localStorage.removeItem(key);
  }

 export function clearLocalData(): void {
    localStorage.clear();
  }

