/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PodcastsService } from './podcasts.service';
import { CreatePodcastDTO } from './dto/create-podcast-dto';
import { Podcast } from './podcast.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

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
        {
          provide: getRepositoryToken(Podcast),
          useValue: mockPodcastRepository,
        },
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
    const podcasts = [
      { title: 'Podcast 1', id: 0 },
      { title: 'Podcast 2', id: 1 },
    ];

    // Act: Call the service method being tested
    const result = await podcastService.findOne(1);

    // Assert: Check that the result matches the expected outcome
    expect(result).toEqual(podcasts[1]);
  });

  // Testing GetOne Endpoint: No input found :  Failure
  it('should return a podcast that does not match desired result', async () => {
    // Arrange: Define the list of podcasts
    const listOfPodcasts = [
      { title: 'Podcast 1', id: 1 },
      { title: 'Podcast 2', id: 2 },
    ];

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
    const existingPodcast: Podcast = {
      id: podcastId,
      title: 'Original Title',
      creators: [],
      releaseDate: '',
      fullPodcastDuration: '',
      playlists: [],
    };
    const updatedPodcast: CreatePodcastDTO = {
      title: 'Updated Title',
      creators: [],
      releaseDate: '2024-01-01',
      fullPodcastDuration: '01:00:00',
      playlists: [],
    };

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
    // eslint-disable-next-line prettier/prettier
    expect(podcastRepository.findOne).toHaveBeenCalledWith({ where: { id: podcastId } });
    // eslint-disable-next-line prettier/prettier
    expect(podcastRepository.save).toHaveBeenCalledWith(expect.objectContaining({
    	id: podcastId,
        title: updatedPodcast.title,
        releaseDate: updatedPodcast.releaseDate,
        fullPodcastDuration: updatedPodcast.fullPodcastDuration,
    }));
  });

  // Testing Update Endpoint : Does not Successfully Update
  it('should not update a single podcast based on an id', async () => {
    // Arrange
    const podcastId = 1;
    const existingPodcast: Podcast = {
      id: 0,
      title: 'Original Title',
      creators: [],
      releaseDate: '',
      fullPodcastDuration: '',
      playlists: [],
    };
    const updatedPodcast: CreatePodcastDTO = {
      title: 'Updated Title',
      creators: [],
      releaseDate: '2024-01-01',
      fullPodcastDuration: '01:00:00',
      playlists: [],
    };

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
    expect(result.title).toBeNull();
    expect(result.releaseDate).toBeNull();
    expect(result.fullPodcastDuration).toBeNull();
    // eslint-disable-next-line prettier/prettier
    expect(podcastRepository.findOne).toHaveBeenCalledWith({ where: { id: podcastId } });
    expect(podcastRepository.findOne).toBe(NotFoundException);
  });

  // Testing Update Endpoint : Null : Success
  it('should update a single podcast based on an id', async () => {
    // Arrange
    const podcastId = 1;
    const existingPodcast: Podcast = {
      id: null,
      title: null,
      creators: null,
      releaseDate: null,
      fullPodcastDuration: null,
      playlists: null,
    };
    const updatedPodcast: CreatePodcastDTO = {
      title: 'Updated Title',
      creators: [],
      releaseDate: '2024-01-01',
      fullPodcastDuration: '01:00:00',
      playlists: [],
    };

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
    expect(result.title).toBeNull();
    expect(result.releaseDate).toBeNull();
    expect(result.fullPodcastDuration).toBeNull();
    expect(podcastRepository.findOne).toBeNull();
  });

  ////////// CREATE \\\\\\\\\\

  // Testing Create Endpoint : Successfully Creates
  it('should create a single podcast', async () => {
    // Arrange
    const podcastDTO: CreatePodcastDTO = {
      title: 'Title',
      creators: [],
      releaseDate: '2024-01-01',
      fullPodcastDuration: '01:00:00',
      playlists: [],
    };

    // Act: Call the service method being tested
    const result = await podcastService.create(podcastDTO);

    // Assert: Check that the result matches the expected outcome
    expect(result.title).toBeTruthy();
    expect(result.releaseDate).toBeTruthy();
    expect(result.fullPodcastDuration).toBeTruthy();
    // eslint-disable-next-line prettier/prettier
    expect(podcastRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        title: podcastDTO.title,
        releaseDate: podcastDTO.releaseDate,
        fullPodcastDuration: podcastDTO.fullPodcastDuration,
    }));
  });

  // Testing Create Endpoint : Does not Successfully Create
  it('should not create a single podcast becuase it is empty', async () => {
    // Arrange
    const podcastDTO: CreatePodcastDTO = {
      title: '',
      creators: [],
      releaseDate: '',
      fullPodcastDuration: '',
      playlists: []
    };

    // Act and Assert
    await expect(podcastService.create(podcastDTO)).toThrow(NotFoundException);
  });

  // Testing Create Endpoint : Null : Success
  it('should not create a single podcast because it is null', async () => {
    // Arrange
    const podcastDTO: CreatePodcastDTO = {
      title: null,
      creators: null,
      releaseDate: null,
      fullPodcastDuration: null,
      playlists: null
    };

    // Act: Call the service method being tested
    const result = await podcastService.create(podcastDTO);

    // Assert: Check that the result matches the expected outcome
    expect(result).toBeNull();
  });

  ////////// DELETE \\\\\\\\\\

  // Testing Delete Endpoint : Successfully Deletes
  it('should delete a single podcast based on an id', async () => {
    // Arrange: Get a single podcast based off an id
    const podcastId = 1;
    const existingPodcast: Podcast = {
      id: podcastId,
      title: 'Updated Title',
      creators: [],
      releaseDate: '2024-01-01',
      fullPodcastDuration: '01:00:00',
      playlists: [],
    };

    // Act: Call the service method being tested
    await podcastService.delete(podcastId);

    // Assert: Check that the result matches the expected outcome
    expect(existingPodcast).toBeNull();
  });

  // Testing Delete Endpoint : Does not Successfully Delete : Success
  it('should not delete a single podcast based on an id', async () => {
    // Arrange: Get a single podcast based off an id
    const podcasts = [
      { id: 1, title: 'Title 1', creators: [], releaseDate: '2024-01-01', fullPodcastDuration: '01:00:00', playlists: [] },
      { id: 2, title: 'Title 2', creators: [], releaseDate: '2024-02-02', fullPodcastDuration: '02:00:00', playlists: [] }
    ];

    // Act: Call the service method being tested
    const result = await podcastService.delete(podcasts[2].id);

    // Assert: Check that the result matches the expected outcome
    expect(result).toBeFalsy();
  });

  // Testing Delete Endpoint : Deletes One in a List
  it('should delete a single podcast based on an id from a list of podcasts', async () => {
    // Arrange: Get a single podcast based off an id
    const podcasts = [
      { id: 1, title: 'Title 1', creators: [], releaseDate: '2024-01-01', fullPodcastDuration: '01:00:00', playlists: [] },
      { id: 2, title: 'Title 2', creators: [], releaseDate: '2024-02-02', fullPodcastDuration: '02:00:00', playlists: [] }
    ];
    // Act: Call the service method being tested
    await podcastService.delete(podcasts[1].id);

    // Assert: Check that the result matches the expected outcome
    expect(podcasts[0]).toBeTruthy();
    expect(podcasts[1]).toBeNull();
  });

  // Testing Delete Endpoint : Null : Success
  it('should not delete a single podcast based on an id because it is null', async () => {
    // Arrange: Get a single podcast based off an id
    const nullPodcast: Podcast = { id: null, title: null, creators: null, releaseDate: null, fullPodcastDuration: null, playlists: null };

    // Act: Call the service method being tested
    const result = await podcastService.delete(nullPodcast.id);

    // Assert: Check that the result matches the expected outcome
    expect(result).toBeNull();
  });
});
