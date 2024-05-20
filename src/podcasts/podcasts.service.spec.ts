import { Test, TestingModule } from '@nestjs/testing';
import { PodcastsService } from './podcasts.service';
import { CreatePodcastDTO } from './dto/create-podcast-dto';
import { Podcast } from './podcast.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

// Mock the repository and the entity
const mockPodcastRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
};

describe('PodcastsService', () => {
  let podcastService: PodcastsService;
  let podcastRepository: Repository<Podcast>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PodcastsService,
        { provide: getRepositoryToken(Podcast), useValue: mockPodcastRepository }
      ],
    }).compile();

    podcastService = module.get<PodcastsService>(PodcastsService);
    podcastRepository = module.get<Repository<Podcast>>(getRepositoryToken(Podcast));
  });

  afterEach(() => {
    jest.clearAllMocks();  // Clear all mocks after each test to avoid interference between tests
  });

  it('should be defined', () => {
    expect(podcastService).toBeDefined();
  });

  ////////// GET ALL \\\\\\\\\\

  // Testing GetAll Endpoint : Success
  it('should return an array of podcasts', async () => {
    // Arrange: Get an array of podcasts
    const listOfPodcasts = [{ title: 'Podcast 1' }, { title: 'Podcast 2' }];

    // Act: Call the service method being tested
    const result = await podcastService.findAll();

    // Assert: Check that the result matches the expected outcome
    expect(result).toEqual(listOfPodcasts);
  });

  // Testing GetAll Endpoint : Null : Success
  it('should return null', async () => {
    // Act: Call the service method being tested
    const result = await podcastService.findAll();

    // Assert: Check that the result matches the expected outcome
    expect(result).toBeNull;
  });

  // Testing GetAll Endpoint : Empty List : Success
  it('should return an empty podcast array', async () => {
    // Arrange: Get an array of podcasts
    const listOfPodcasts = [];

    // Act: Call the service method being tested
    const result = await podcastService.findAll();

    // Assert: Check that the result matches the expected outcome
    expect(result).toEqual(listOfPodcasts);
  });

  ////////// GET ONE \\\\\\\\\\

  // Testing GetOne Endpoint : One input : Success
  it('should return a single podcast', async () => {
    // Arrange: Get a single podcast
    const podcast = { title: 'Podcast 1', id: 0 };

    // Act: Call the service method being tested
    const result = await podcastService.findOne(0);

    // Assert: Check that the result matches the expected outcome
    expect(result).toEqual(podcast);
  });

  // Testing GetOne Endpoint: Multiple inputs | Chooses right one : Success
  it('should return a single podcast from the array of multiple podcasts', async () => {
    // Arrange: Define the expected podcast (assuming it's the first podcast in the list)
    const podcasts = [{ title: 'Podcast 1', id: 0 }, { title: 'Podcast 2', id: 1 }];

    // Act: Call the service method being tested
    const result = await podcastService.findOne(1);

    // Assert: Check that the result matches the expected outcome
    expect(result).toEqual(podcasts[1]);
  });

  // Testing GetOne Endpoint: No input found :  Failure
  it('should return a podcast that does not match desired result', async () => {
    // Arrange: Define the list of podcasts
    const listOfPodcasts = [{ title: 'Podcast 1', id: 1 }, { title: 'Podcast 2', id: 2 }];

    // Act: Call the service method being tested
    const result = await podcastService.findOne(2);

    // Assert: Check that the result doesn't match any podcast in the list
    expect(listOfPodcasts[1]).toEqual(result);
  });

  // Testing GetOne Endpoint : Null
  it('should return a single podcast', async () => {
    // Act: Call the service method being tested
    const result = await podcastService.findOne(0);

    // Assert: Check that the result matches the expected outcome
    expect(result).toBeNull;
  });

  ////////// UPDATE \\\\\\\\\\

  // Testing Update Endpoint : Successfully Updates
  it('should update a single podcast based on an id', async () => {
    // Arrange
    const podcastId = 1;
    const existingPodcast: Podcast = { id: podcastId, title: 'Original Title', creators: [], releaseDate: '', fullPodcastDuration: '', playlists: [] };
    const updatedPodcast: CreatePodcastDTO = { title: 'Updated Title', creators: [], releaseDate: '2024-01-01', fullPodcastDuration: '01:00:00', playlists: [] };

    // Mock findOne to return the existingPodcast
    mockPodcastRepository.findOne.mockResolvedValue(existingPodcast);
    // Mock save to return the updated podcast
    mockPodcastRepository.save.mockResolvedValue({
      ...existingPodcast,
      ...updatedPodcast,
    });

    // Act
    const result = await podcastService.update(podcastId, updatedPodcast);

    // Assert
    expect(result.title).toBe(updatedPodcast.title);
    expect(result.releaseDate).toBe(updatedPodcast.releaseDate);
    expect(result.fullPodcastDuration).toBe(updatedPodcast.fullPodcastDuration);
    expect(podcastRepository.findOne).toHaveBeenCalledWith({ where: { id: podcastId } });
    expect(podcastRepository.save).toHaveBeenCalledWith(expect.objectContaining({
      id: podcastId,
      title: updatedPodcast.title,
      releaseDate: updatedPodcast.releaseDate,
      fullPodcastDuration: updatedPodcast.fullPodcastDuration,
    }));
  });

  ////////////////////////////////////// STOPPED HERE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // Testing Update Endpoint : Does not Successfully Update
  it('should not update a single podcast based on an id', async () => {
    // Arrange
    const podcastId = 1;
    const existingPodcast: Podcast = { id: podcastId, title: 'Original Title', creators: [], releaseDate: '', fullPodcastDuration: '', playlists: [] };
    const updatedPodcast: CreatePodcastDTO = { title: 'Updated Title', creators: [], releaseDate: '2024-01-01', fullPodcastDuration: '01:00:00', playlists: [] };

    // Mock findOne to return the existingPodcast
    mockPodcastRepository.findOne.mockResolvedValue(existingPodcast);
    // Mock save to return the updated podcast
    mockPodcastRepository.save.mockResolvedValue({
      ...existingPodcast,
      ...updatedPodcast,
    });

    // Act
    const result = await podcastService.update(podcastId, updatedPodcast);

    // Assert
    expect(result.title).toBe(updatedPodcast.title);
    expect(result.releaseDate).toBe(updatedPodcast.releaseDate);
    expect(result.fullPodcastDuration).toBe(updatedPodcast.fullPodcastDuration);
    expect(podcastRepository.findOne).toHaveBeenCalledWith({ where: { id: podcastId } });
    expect(podcastRepository.save).toHaveBeenCalledWith(expect.objectContaining({
      id: podcastId,
      title: updatedPodcast.title,
      releaseDate: updatedPodcast.releaseDate,
      fullPodcastDuration: updatedPodcast.fullPodcastDuration,
    }));
  });

  // Testing Update Endpoint : Null : Success
  it('should update a single podcast based on an id', async () => {
    // Arrange: Get a single podcast based off an id
    const podcast = [];

    // Act: Call the service method being tested
    const result = await podcastService.update(podcast);

    // Assert: Check that the result matches the expected outcome
    expect(result).toBeNull();
  });

  ////////// CREATE \\\\\\\\\\

  // Testing Create Endpoint : Successfully Creates
  it('should update a single podcast based on an id', async () => {
    // Arrange: Get a single podcast based off an id
    const podcast = [];

    // Act: Call the service method being tested
    const result = await podcastService.create();

    // Assert: Check that the result matches the expected outcome
    expect(podcast).toEqual(result);
  });

  // // Testing Create Endpoint : Does not Successfully Create
  // it('should update a single podcast based on an id', async () => {
  //   // Arrange: Get a single podcast based off an id
  //   const podcast = [];

  //   // Act: Call the service method being tested
  //   const result = await podcastService.create();

  //   // Assert: Check that the result matches the expected outcome
  //   expect(podcast).toEqual(result);
  // });

  // // Testing Create Endpoint : Null : Success
  // it('should update a single podcast based on an id', async () => {
  //   // Arrange: Get a single podcast based off an id
  //   const podcast = [];

  //   // Act: Call the service method being tested
  //   const result = await podcastService.create();

  //   // Assert: Check that the result matches the expected outcome
  //   expect(result).toBeNull();
  // });

  ////////// DELETE \\\\\\\\\\

  // Testing Delete Endpoint : Successfully Deletes
  it('should update a single podcast based on an id', async () => {
    // Arrange: Get a single podcast based off an id
    const podcast = { title: 'Podcast 0', id: 0 };

    // Act: Call the service method being tested
    const result = await podcastService.update(podcast[0]);

    // Assert: Check that the result matches the expected outcome
    expect(result.length).toEqual(0);
  });

  // Testing Delete Endpoint : Does not Successfully Delete : Success
  it('should update a single podcast based on an id', async () => {
    // Arrange: Get a single podcast based off an id
    const podcast = [{ title: 'Podcast 0', id: 0 }, { title: 'Podcast 1', id: 1 }];

    // Act: Call the service method being tested
    const result = await podcastService.delete(podcast[2]);

    // Assert: Check that the result matches the expected outcome
    expect(podcast.length).toEqual(result);
  });

  // Testing Delete Endpoint : Deletes One in a List
  it('should update a single podcast based on an id', async () => {
    // Arrange: Get a single podcast based off an id
    const podcast = [{ title: 'Podcast 0', id: 0 }, { title: 'Podcast 1', id: 1 }];

    // Act: Call the service method being tested
    const result = await podcastService.delete(podcast[1]);

    // Assert: Check that the result matches the expected outcome
    expect(podcast.length).toEqual(1);
  });

  // Testing Delete Endpoint : Null : Success
  it('should update a single podcast based on an id', async () => {
    // Arrange: Get a single podcast based off an id
    const podcast = [];

    // Act: Call the service method being tested
    const result = await podcastService.delete(podcast[0]);

    // Assert: Check that the result matches the expected outcome
    expect(result).toBeNull();
  });
});
