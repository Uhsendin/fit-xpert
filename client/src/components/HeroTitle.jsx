import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from '@mantine/core';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(28),
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor: theme.fn.variant({
      variant: 'light',
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: `${rem(4)} ${rem(12)}`,
  },
}));

export function HeroTitle() {
  const { classes } = useStyles();
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Welcome to <span className={classes.highlight}>FitXpert</span> -
              Fitness Companion!
            </Title>
            <Text color="dimmed" mt="md">
              Ready for a transformative fitness journey? Meet FitXpert - your
              all-in-one solution for peak performance and a healthier
              lifestyle.
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={<ThemeIcon size={20} radius="xl"></ThemeIcon>}
            >
              <List.Item>
                <b>Personalized Workout Plans</b> – Our platform tailors
                workouts to your level and goals. From beginners to athletes,
                FitXpert provides custom exercises for maximum potential.
              </List.Item>
              <List.Item>
                <b>Nutrition Tracking Made Simple</b> – Fuel your body for
                success! Easily track your food intake and receive expert
                dietary recommendations.
              </List.Item>
              <List.Item>
                <b>Interactive Progress Tracking</b> – Stay motivated with
                comprehensive progress tracking. Celebrate achievements and
                overcome obstacles with confidence.
              </List.Item>
            </List>

            <Group mt={30}>
              <Link to="authentication">
                <Button radius="xl" size="md" className={classes.control}>
                  Get started
                </Button>
              </Link>
            </Group>
          </div>
          <Image src="./yoga.png" className={classes.image} />
        </div>
      </Container>
    </div>
  );
}
