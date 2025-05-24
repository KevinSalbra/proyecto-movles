import { IonContent, IonPage } from '@ionic/react';
import { useState } from 'react';
import '../theme/variables.css';
import LevelProgress from '../components/LevelProgress';
import Card from '../components/Card';
import data from '../data.json'
import StreakCard from '../components/StreakCard';
import StatsCard from '../components/StatsCard';
import TodayProgress from '../components/TodayProgress';
import QuickActions from '../components/QuickActions';
import Title from '../components/ui/Title';
import Text from '../components/ui/Text';
import Container from '../components/ui/Container';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Link } from 'react-router-dom';
const initializeStatusBar = async () => {
    try {
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: '#4CAF50' });
        await StatusBar.show();
        await StatusBar.setOverlaysWebView({ overlay: false });
    } catch (error) {
        console.error('Error al configurar StatusBar:', error);
    }
};

// Inicializar StatusBar
initializeStatusBar();
const HomeScreen: React.FC = () => {
    const { stats, achievements } = data.data;
    const [todayItems] = useState([2, 3, 4]);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return '¡Buenos días!';
        if (hour < 18) return '¡Buenas tardes!';
        return '¡Buenas noches!';
    };

    const getMotivationalMessage = () => {
        if (todayItems.length === 0) {
            return '¡Comienza tu día reciclando algo! 🌱';
        }
        if (todayItems.length < 3) {
            return `¡Vas genial! Recicla ${3 - todayItems.length} más para mantener tu racha 🔥`;
        }
        return '¡Increíble! Ya cumpliste tu meta diaria 🎉';
    };

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className="gradient-primary flex-1">
                    <Container padding="sm" className="pt-6 space-y-5">
                        {/* Header */}
                        <div className='flex justify-between items-center mb-5'>
                            <div className='space-y-1'>
                                <Title variant="h2" color="white">
                                    {getGreeting()}, Jose!
                                </Title>
                                <Text size="base" color="white">
                                    Reciclador Nivel 1
                                </Text>
                            </div>
                            <div className='bg-white rounded-full size-15 flex items-center justify-center'>
                                <Link to="/profile">
                                    <Text size="xl" weight="bold" color="black">1</Text>
                                </Link>
                            </div>
                        </div>

                        {/* Progress level */}
                        <div>
                            <LevelProgress stats={stats} />
                        </div>

                        {/* Motivational Message */}
                        <div>
                            <Card className='!py-6'>
                                <Text size="base" weight="semibold" color="black" className="text-center">
                                    {getMotivationalMessage()}
                                </Text>
                            </Card>
                        </div>

                        {/* Daily Goals */}
                        <div className='flex flex-row justify-stretch gap-5'>
                            <StreakCard streak={stats.currentStreak} />
                            <StatsCard title='Logros' value={`${stats.unlockedAchievements}/${achievements.length}`} />
                        </div>

                        {/* Progress today */}
                        <TodayProgress items={todayItems} />
                        <QuickActions />
                    </Container>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default HomeScreen;
