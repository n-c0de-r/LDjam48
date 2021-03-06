	var objects;
	var platforms;
	var player;
	var map;
	var cursors;
	var exits;

var Start = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "Start" });
    },
    init: function() {},

    preload: function() {
        this.load.tilemapTiledJSON('Start', 'assets/Start.JSON');
		this.load.image('exit', 'assets/exit.png');
		this.load.image('sky', 'assets/tilesetOpenGameBackground.png');
		this.load.image('Backgrounds', 'assets/Fore - Jungle Grass.png');
		this.load.image('Foregrounds', 'assets/plates.png');
		this.load.spritesheet('blob', 'assets/goop.png', { frameWidth: 16, frameHeight: 18 });
    },
	
    create: function() {
        let bg = this.add.image(0, 0, 'sky').setOrigin(0,0);
		
		map = this.add.tilemap('Start');
		
		var backgroundTiles = map.addTilesetImage('back', 'Backgrounds');
		var foregroundTiles = map.addTilesetImage('cave', 'Foregrounds');
		var hillLayer = map.createStaticLayer('Hills', foregroundTiles);
		var stuffLayer = map.createLayer('Stuff', foregroundTiles);
		hillLayer.setCollisionByExclusion(-1, true);
		
		exits = this.physics.add.group({
        allowGravity: false
		});
		exits.create(200, 312, 'exit');
		exits.setVisible(false);
		
		cursors = this.input.keyboard.createCursorKeys();
		
		player = this.physics.add.sprite(40, 80, 'blob');
		
		player.setBounce(0.2);
		player.setCollideWorldBounds(true);
		
		player.body.setGravityY(300);
		
		this.physics.add.collider(player, hillLayer);
		this.physics.add.collider(player, exits);
		
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

		this.physics.add.collider(player, exits, changeScene, null, this);
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
		else if (cursors.shift.isDown)
		{
			this.scene.start("Level1")
		}
		else
		{
			player.setVelocityX(0);

			player.anims.play('idle', true);
		}

		if ((cursors.up.isDown || cursors.space.isDown) && player.body.onFloor())
		{
			player.setVelocityY(-240);
		}
	}
});
