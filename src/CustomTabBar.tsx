import React from 'react'
import { IonTabButton, IonIcon, IonLabel, IonTabBar } from '@ionic/react'
import { homeOutline, cameraOutline, mapOutline, timeOutline, personOutline, home, camera, map, time, person } from 'ionicons/icons'
import { useLocation } from 'react-router-dom';

const TAB_ROUTES = ['/home', '/map', '/history', '/profile'];

export const CustomTabBar = () => {
    const location = useLocation();
    if (!TAB_ROUTES.includes(location.pathname)) return null;

    return (
        <IonTabBar slot="bottom"
            className="rounded-t-2xl shadow-lg h-16 z-50 custom-tabbar "
        >
            <IonTabButton tab="home" href="/home">
                <IonIcon aria-hidden="true"
                    icon={location.pathname === '/home' ? home : homeOutline}
                />
                <IonLabel>Inicio</IonLabel>
            </IonTabButton>

            <IonTabButton tab="map" href="/map">
                <IonIcon aria-hidden="true"
                    icon={location.pathname === '/map' ? map : mapOutline}
                />
                <IonLabel>Mapa</IonLabel>
            </IonTabButton>
            <IonTabButton
                tab="camera"
                href="/camera"
                className="!bg-transparent relative"
            >
                <div
                    className='absolute -top-8  bg-green-600 flex justify-center items-center  p-2 rounded-full m-2 shadow-2xl  border-gray-600/10'
                >
                    <IonIcon aria-hidden="true"
                        icon={location.pathname === '/camera' ? camera : cameraOutline}
                        className='text-white size-9 p-0  z-10'
                    />

                </div>
                {/* <IonLabel className="text-white text-xs font-bold">Cámara</IonLabel> */}
            </IonTabButton>
            <IonTabButton tab="history" href="/history">
                <IonIcon aria-hidden="true"
                    icon={location.pathname === '/history' ? time : timeOutline}
                />
                <IonLabel>Historial</IonLabel>
            </IonTabButton>
            <IonTabButton tab="profile" href="/profile">
                <IonIcon aria-hidden="true"
                    icon={location.pathname === '/profile' ? person : personOutline}
                />
                <IonLabel>Perfil</IonLabel>
            </IonTabButton>
        </IonTabBar>

    )
}
