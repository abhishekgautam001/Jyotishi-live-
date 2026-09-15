import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  Clock, 
  Sun, 
  Star, 
  Check, 
  Sparkles, 
  Volume2, 
  CheckCheck,
  Flame
} from 'lucide-react';
import { AppNotification } from '../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllRead: () => void;
  onRequestBrowserPush: () => void;
  hasBrowserPushEnabled: boolean;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onRequestBrowserPush,
  hasBrowserPushEnabled,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FFFDF9] border-l border-amber-200 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 bg-gradient-to-r from-amber-700 via-orange-600 to-amber-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-200" />
            <div>
              <h3 className="font-semibold text-sm sm:text-base">Push Notifications & Reminders</h3>
              <p className="text-[11px] text-amber-100">Session Reminders, Muhurats & Reviews</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 text-white/90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Browser Push Permission Request Prompt */}
        <div className="p-3 bg-amber-50/90 border-b border-amber-200 flex items-center justify-between text-xs">
          <span className="text-slate-700 font-medium">
            {hasBrowserPushEnabled
              ? '✓ Browser Push Notifications Active'
              : 'Enable Push Notifications for live call reminders'}
          </span>
          {!hasBrowserPushEnabled && (
            <button
              onClick={onRequestBrowserPush}
              className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-[11px] shadow-2xs shrink-0 ml-2"
            >
              Enable Push
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Recent Alerts</span>
            <button
              onClick={onMarkAllRead}
              className="text-amber-800 hover:text-amber-950 font-semibold flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
          </div>

          {notifications.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-xs">
              No new notifications.
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3.5 rounded-2xl border transition-all text-xs ${
                  n.read
                    ? 'bg-white border-amber-100 text-slate-600'
                    : 'bg-amber-50/70 border-amber-300 text-slate-800 shadow-2xs font-medium'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{n.title}</h4>
                  <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                </div>
                <p className="mt-1 leading-relaxed text-slate-600">{n.message}</p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-amber-50/50 border-t border-amber-200 text-center text-[11px] text-slate-500">
          Daily Muhurat • Surya Arghya • 10-min Before Session Reminders
        </div>
      </div>
    </div>
  );
};
