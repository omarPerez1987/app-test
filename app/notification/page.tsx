"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { createContext, useContext, useState } from "react";

interface NotificationProps {
  message: string;
  type: string;
  onClose: () => void;
}

const NotificationContext = createContext({
  addNotification: () => {},
});

const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("No existe el provider");
  }
  return context;
};

const Notification = ({ message, type, onClose }: NotificationProps) => {
  return (
    <div
      className={clsx(
        "flex justify-between uppercase text-xs py-3 font-bold px-2 w-72 rounded mt-1 text-white",
        type === "error" ? "bg-red-500" : "bg-green-500"
      )}
    >
      <p>{message}</p>
      <button onClick={onClose}>X</button>
    </div>
  );
};

type NotificationProviderProp = {
  message: string;
  type: string;
};

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<
    NotificationProviderProp[]
  >([]);

  const addNotification = (message: string, type: string) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}

      <div className="absolute px-6 right-0 top-10">
        {notifications.map(({ id, message, type }) => (
          <Notification
            key={id}
            message={message}
            type={type}
            onClose={() => removeNotification(id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

function NotificationApp() {
  const { addNotification } = useNotification();

  return (
    <section className="flex gap-2 justify-center mt-4">
      <Button
        variant={"secondary"}
        onClick={() =>
          addNotification("Esto es una notificacion de exito", "success")
        }
      >
        Notificación positiva
      </Button>
      <Button
        variant={"secondary"}
        onClick={() =>
          addNotification("Esto es una notificacion de error", "error")
        }
      >
        Notificación erronea
      </Button>
    </section>
  );
}

const Root = () => {
  return (
    <NotificationProvider>
      <NotificationApp />
    </NotificationProvider>
  );
};

export default Root;
