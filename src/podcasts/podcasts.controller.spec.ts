// import { Test, TestingModule } from '@nestjs/testing';
// import { PodcastsController } from './podcasts.controller';

// describe('PodcastsController', () => {
//   let podcastsController: PodcastsController;

//   beforeEach(async () => {
//     // Arrange: Create a testing module with the PodcastsController
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [PodcastsController],
//     }).compile();

//     // Act: Get an instance of the PodcastsController from the testing module
//     podcastsController = module.get<PodcastsController>(PodcastsController);
//   });

//   it('should be defined', () => {
//     // Assert: Check that the controller is defined
//     expect(podcastsController).toBeDefined();
//   });

//   ////////// GET ALL \\\\\\\\\\

//   // Testing GetAll Endpoint : Success
//   it('should return an array of podcasts', async () => {
//     // Arrange: Get an array of podcasts
//     const listOfPodcasts = [{ title: 'Podcast 1' }, { title: 'Podcast 2' }];

//     // Act: Call the controller method being tested
//     const result = await podcastsController.findAll();

//     // Assert: Check that the result matches the expected outcome
//     expect(result).toEqual(listOfPodcasts);
//   });

//   // Testing GetAll Endpoint : Null : Success
//   it('should return an array of podcasts', async () => {
//     // Act: Call the controller method being tested
//     const result = await podcastsController.findAll();

//     // Assert: Check that the result matches the expected outcome
//     expect(result).toBeNull;
//   });

//   // Testing GetAll Endpoint : Empty List : Success
//   it('should return an array of podcasts', async () => {
//     // Arrange: Get an array of podcasts
//     const listOfPodcasts = [];

//     // Act: Call the controller method being tested
//     const result = await podcastsController.findAll();

//     // Assert: Check that the result matches the expected outcome
//     expect(result).toEqual(listOfPodcasts);
//   });

//   ////////// GET ONE \\\\\\\\\\

//   // Testing GetOne Endpoint : One input : Success
//   it('should return a single podcast', async () => {
//     // Arrange: Get a single podcast
//     const podcast = { title: 'Podcast 1', id: 0 };

//     // Act: Call the controller method being tested
//     const result = await podcastsController.findOne(0);

//     // Assert: Check that the result matches the expected outcome
//     expect(result).toEqual(podcast);
//   });

//   // Testing GetOne Endpoint: Multiple inputs | Chooses right one : Success
//   it('should return a single podcast', async () => {
//     // Arrange: Define the expected podcast (assuming it's the first podcast in the list)
//     const expectedPodcast = [{ title: 'Podcast 1', id: 0 }, { title: 'Podcast 2', id: 1 }];

//     // Act: Call the controller method being tested
//     const result = await podcastsController.findOne(1);

//     // Assert: Check that the result matches the expected outcome
//     expect(result).toEqual(expectedPodcast);
//   });

//   // Testing GetOne Endpoint: No input found :  Failure
//   it('should not return any podcast', async () => {
//     // Arrange: Define the list of podcasts
//     const listOfPodcasts = [{ title: 'Podcast 1', id: 1 }, { title: 'Podcast 2', id: 2 }];

//     // Act: Call the controller method being tested
//     const result = await podcastsController.findOne(2);

//     // Assert: Check that the result doesn't match any podcast in the list
//     expect(listOfPodcasts[1]).toEqual(result);
//   });

//   // Testing GetOne Endpoint : Null
//   it('should return a single podcast', async () => {
//     // Act: Call the controller method being tested
//     const result = await podcastsController.findOne(0);

//     // Assert: Check that the result matches the expected outcome
//     expect(result).toBeNull;
//   });

//   ////////// UPDATE \\\\\\\\\\

//   // Testing Update Endpoint : Successfully Updates
//   it('should update a single podcast based on an id', async () => {
//     // Arrange: Get a single podcast based off an id
//     const podcast = { title: 'Podcast 0', id: 0 };
//     const updatedPodcast = { title: 'Podcast 1', id: 0 };

//     // Act: Call the controller method being tested
//     const result = await podcastsController.update(podcast.id, updatedPodcast);

//     // Assert: Check that the result matches the expected outcome
//     expect(updatedPodcast).toEqual(result);
//   });

//   // Testing Update Endpoint : Does not Successfully Update
//   it('should update a single podcast based on an id', async () => {
//     // Arrange: Get a single podcast based off an id
//     const podcast = { title: 'Podcast 0', id: 0 };
//     const updatedPodcast = { title: 'Podcast 1', id: 0 };

//     // Act: Call the controller method being tested
//     const result = await podcastsController.update(podcast);

//     // Assert: Check that the result matches the expected outcome
//     expect(updatedPodcast).toEqual(result);
//   });

//   // Testing Update Endpoint : Null : Success
//   it('should update a single podcast based on an id', async () => {
//     // Arrange: Get a single podcast based off an id
//     const podcast = [];

//     // Act: Call the controller method being tested
//     const result = await podcastsController.update(podcast);

//     // Assert: Check that the result matches the expected outcome
//     expect(result).toBeNull();
//   });

//   ////////// CREATE \\\\\\\\\\

//   // Testing Create Endpoint : Successfully Creates
//   it('should update a single podcast based on an id', async () => {
//     // Arrange: Get a single podcast based off an id
//     const podcast = [];

//     // Act: Call the controller method being tested
//     const result = await podcastsController.create();

//     // Assert: Check that the result matches the expected outcome
//     expect(podcast).toEqual(result);
//   });

//   // // Testing Create Endpoint : Does not Successfully Create
//   // it('should update a single podcast based on an id', async () => {
//   //   // Arrange: Get a single podcast based off an id
//   //   const podcast = [];

//   //   // Act: Call the controller method being tested
//   //   const result = await podcastsController.create();

//   //   // Assert: Check that the result matches the expected outcome
//   //   expect(podcast).toEqual(result);
//   // });

//   // // Testing Create Endpoint : Null : Success
//   // it('should update a single podcast based on an id', async () => {
//   //   // Arrange: Get a single podcast based off an id
//   //   const podcast = [];

//   //   // Act: Call the controller method being tested
//   //   const result = await podcastsController.create();

//   //   // Assert: Check that the result matches the expected outcome
//   //   expect(result).toBeNull();
//   // });

//   ////////// DELETE \\\\\\\\\\

//   // Testing Delete Endpoint : Successfully Deletes
//   it('should update a single podcast based on an id', async () => {
//     // Arrange: Get a single podcast based off an id
//     const podcast = { title: 'Podcast 0', id: 0 };

//     // Act: Call the controller method being tested
//     const result = await podcastsController.update(podcast[0]);

//     // Assert: Check that the result matches the expected outcome
//     expect(result.length).toEqual(0);
//   });

//   // Testing Delete Endpoint : Does not Successfully Delete : Success
//   it('should update a single podcast based on an id', async () => {
//     // Arrange: Get a single podcast based off an id
//     const podcast = [{ title: 'Podcast 0', id: 0 }, { title: 'Podcast 1', id: 1 }];

//     // Act: Call the controller method being tested
//     const result = await podcastsController.delete(podcast[2]);

//     // Assert: Check that the result matches the expected outcome
//     expect(podcast.length).toEqual(result);
//   });

//   // Testing Delete Endpoint : Deletes One in a List
//   it('should update a single podcast based on an id', async () => {
//     // Arrange: Get a single podcast based off an id
//     const podcast = [{ title: 'Podcast 0', id: 0 }, { title: 'Podcast 1', id: 1 }];

//     // Act: Call the controller method being tested
//     const result = await podcastsController.delete(podcast[1]);

//     // Assert: Check that the result matches the expected outcome
//     expect(podcast.length).toEqual(1);
//   });

//   // Testing Delete Endpoint : Null : Success
//   it('should update a single podcast based on an id', async () => {
//     // Arrange: Get a single podcast based off an id
//     const podcast = [];

//     // Act: Call the controller method being tested
//     const result = await podcastsController.delete(podcast[0]);

//     // Assert: Check that the result matches the expected outcome
//     expect(result).toBeNull();
//   });
// });
