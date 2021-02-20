import React, { useState } from "react";
import { IonToast, IonButton } from "@ionic/react";

export const AcmeToast: React.FC = () => {
  const [showToast, setShowToast] = useState<boolean>(false);

  return (
    <>
      <IonButton onClick={() => setShowToast(true)} expand="block">
        Pair Device
      </IonButton>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Device successfully paired."
        duration={2000}
      />
    </>
  );
};
