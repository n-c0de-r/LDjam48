var Level1 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "Level 1" });
    },
    init: function() {},

    preload: function() {
        this.load.tilemapTiledJSON('Cave1', 'assets/Cave1.JSON');
		this.load.image('Backgrounds', 'assets/Fore - Jungle Grass.png');
		this.load.image('Foregrounds', 'assets/plates.png');
		this.load.spritesheet('blob', 'assets/goop.png', { frameWidth: 16, frameHeight: 18 });
    },
	
    create: function() {
		
		map = this.add.tilemap('Cave1');
		
		var backgroundTiles = map.addTilesetImage('back', 'Backgrounds');
		var foregroundTiles = map.addTilesetImage('cave', 'Foregrounds');
		var backgroundLayer = map.createLayer('Background', backgroundTiles);
		var BKstuffLayer = map.createLayer('BKstuff', backgroundTiles);
		var middleLayer = map.createLayer('Middle', backgroundTiles);
		var caveLayer = map.createStaticLayer('Cave', foregroundTiles);
		var stuffLayer = map.createLayer('Stuff', foregroundTiles);
		caveLayer.setCollisionByExclusion(-1, true);
		
		cursors = this.input.keyboard.createCursorKeys();
		
		player = this.physics.add.sprite(32, 32, 'blob');
		
		player.setBounce(0.2);
		player.setCollideWorldBounds(true);
		
		player.body.setGravityY(300);
		
		this.physics.add.collider(player, caveLayer);
		
		this.cameras.main.setBounds(0,0, bg.displayWidth, bg.displayHeight);
		this.cameras.main.startFollow(player);
		
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('blob', { start: 3, end: 5 }),
			frameRate: 8,
			repeat: -1
		});
		
		this.anims.create({
			key: 'turn',
			frames: [ { key: 'blob', frame: 7 } ],
			frameRate: 20
		});
		
		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNumbers('blob', { frames: [7, 8, 6] }),
			frameRate: 6,
			repeatDelay: 2000,
			repeat: -1
		});
		
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('blob', {start: 9, end: 11} ),
			frameRate: 8,
			repeat: -1
		});
		this.time.addEvent({
        delay: 10000,
        loop: false,
        callback: () => {
            this.scene.start("Start");
        }
		})
    },
	
    update: function() {
		if (cursors.left.isDown)
		{
			player.setVelocityX(-160);

			player.anims.play('left', true);
		}
		else if (cursors.right.isDown)
		{
			player.setVelocityX(160);

			player.anims.play('right', true);
		}
		else
		{
			player.setVelocityX(0);

			player.anims.play('idle', true);
		}

		if (cursors.up.isDown && player.body.onFloor())
		{
			player.setVelocityY(-240);
		}
	}
});